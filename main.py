import re, base64, json, warnings
import streamlit as st
from agent import MessagesState, create_agent
from ui.sqlitechat_ui import StreamlitUICallbackHandler, message_func
from langchain_core.messages import HumanMessage, AIMessage, ToolMessage

# Ignore syntax warnings
warnings.filterwarnings("ignore", category=SyntaxWarning, message="invalid escape sequence.*")
warnings.filterwarnings("ignore")
chat_history = []


# Read local image and convert to Base64
def get_local_image_base64(image_path):
    with open(image_path, "rb") as f:
        return base64.b64encode(f.read()).decode()


# Local image path (e.g., assets/logo.png)
# image_base64 = get_local_image_base64("assets/nvidia.svg")


gradient_text_html = """
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700;900&display=swap');

.nvidia-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 900;
    font-size: 3.5em;
    color: #76B900;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
    margin: 0;
    padding: 10px 0 0 0;
    text-align: center;
}
.sqlitechat-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 900;
    font-size: 3em;
    background: linear-gradient(90deg, #ff6a00, #ee0979);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    margin: 0;
    padding: 20px 0 0 0;
    text-align: center;
}
</style>
<div class="nvidia-title">NVIDIA 2025 Hackathon</div>
<div class="sqlitechat-title">ChatDB-SQLite</div>
"""

st.markdown(gradient_text_html, unsafe_allow_html=True)

caption_text = "NVIDIA 2025 Hackathon Project - From Hello Agent Team. Interact with databases using natural language, generate various graphical reports, view MCP call logs"

st.caption(caption_text, unsafe_allow_html=True)

model_options = {
    "qwen-plus": "qwen-plus",
    "qwen-turbo": "qwen-turbo",
    "qwen3-max-preview": "qwen3-max-preview"
}

model = st.radio(
    "Select AI Model",
    options=list(model_options.keys()),
    format_func=lambda x: model_options[x],
    index=0,
    horizontal=True,
)
st.session_state["model"] = model

if "assistant_response_processed" not in st.session_state:
    st.session_state["assistant_response_processed"] = True

if "toast_shown" not in st.session_state:
    st.session_state["toast_shown"] = False

if "rate-limit" not in st.session_state:
    st.session_state["rate-limit"] = False

if st.session_state["rate-limit"]:
    st.toast("Probably rate limited. Go easy folks", icon="warning")
    st.session_state["rate-limit"] = False

if st.session_state["model"] == "Deepseek R1":
    st.warning("Deepseek R1 is highly rate limited. Please use it sparingly", icon="warning")

INITIAL_MESSAGE = [
    {"role": "user", "content": "Hi!"},
    {
        "role": "assistant",
        "content": "I'm ChatBI Assistant, connected to SQLite. Let's chat!",
    },
]
config = {"configurable": {"thread_id": "42"}}

with open("ui/sidebar.md", "r") as sidebar_file:
    sidebar_content = sidebar_file.read()

with open("ui/styles.md", "r") as styles_file:
    styles_content = styles_file.read()

chat_data = st.session_state
with st.sidebar:
    with st.expander("Start Asking Questions"):
        st.info(
            "How many product categories do I have, and how many products in each category? Show with bar chart and donut chart",
            icon="?")
        st.info("Draw a stacked area chart of orders, arranged by timeline", icon="?")
        st.info("Analyze payment data, draw a line chart with payment time as X-axis", icon="?")


    def display_tool():
        if "tool_events" in st.session_state:
            if st.session_state["tool_events"] == []:
                st.info("No call logs yet, start your questions")
            else:
                for i, msg in enumerate(st.session_state["tool_events"], 1):
                    with st.expander(f"MCP #{i}: {msg.name}"):
                        st.subheader("call_id")
                        st.write(f"{msg.tool_call_id}")
                        st.subheader("return")
                        try:
                            parsed_json = json.loads(msg.content)
                            st.json(parsed_json)
                        except json.JSONDecodeError as e:
                            st.write(f"{msg.content}")
        else:
            st.info("No call logs yet, start your questions")


    col1, col2 = st.columns([5, 1])
    with col2:
        if st.button("Clear", type="secondary"):
            st.session_state["tool_events"] = []
            st.rerun()
    with col1:
        st.header("MCP Call Logs", divider="rainbow")
    display_tool()

st.write(styles_content, unsafe_allow_html=True)

if "messages" not in st.session_state.keys():
    st.session_state["messages"] = INITIAL_MESSAGE

if "history" not in st.session_state:
    st.session_state["history"] = []

if "model" not in st.session_state:
    st.session_state["model"] = model

if prompt := st.chat_input("Enter your question..."):
    if len(prompt) > 500:
        st.error("Input is too long! Please limit your message to 500 characters.")
    else:
        st.session_state.messages.append({"role": "user", "content": prompt})
        st.session_state["assistant_response_processed"] = False

messages_to_display = st.session_state.messages.copy()

for message in messages_to_display:
    message_func(
        message["content"],
        is_user=(message["role"] == "user"),
        is_df=(message["role"] == "data"),
        model=model,
    )

callback_handler = StreamlitUICallbackHandler(model)

react_graph = create_agent(callback_handler, st.session_state["model"])


def append_chat_history(question, answer):
    st.session_state["history"].append((question, answer))


def get_sql(text):
    sql_match = re.search(r"```sql\n(.*)\n```", text, re.DOTALL)
    return sql_match.group(1) if sql_match else None


def append_message(content, role="assistant"):
    if content.strip():
        st.session_state.messages.append({"role": role, "content": content})


def handle_sql_exception(query, conn, e, retries=2):
    pass


def execute_sql(query, conn, retries=2):
    if re.match(r"^\s*(drop|alter|truncate|delete|insert|update)\s", query, re.I):
        append_message("Sorry, I can't execute queries that can modify the database.")
        return None
    try:
        return conn.sql(query).collect()
    except SnowparkSQLException as e:
        return handle_sql_exception(query, conn, e, retries)


if (
        "messages" in st.session_state
        and st.session_state["messages"][-1]["role"] == "user"
        and not st.session_state["assistant_response_processed"]
):
    user_input_content = st.session_state["messages"][-1]["content"]

    if isinstance(user_input_content, str):
        callback_handler.start_loading_message()

        messages = [HumanMessage(content=user_input_content)]

        state = MessagesState(messages=messages)
        result = react_graph.invoke(state, config=config, debug=True)

        if result["messages"]:
            assistant_message = callback_handler.final_message
            append_message(assistant_message)
            st.session_state["assistant_response_processed"] = True
            st.session_state["tool_events"] = [msg for msg in result['messages'] if isinstance(msg, ToolMessage)]

        import time

        time.sleep(1)
        st.rerun()

if (
        st.session_state["model"] == "Mixtral 8x7B"
        and st.session_state["messages"][-1]["content"] == ""
):
    st.session_state["rate-limit"] = True