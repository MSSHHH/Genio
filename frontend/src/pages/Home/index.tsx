import { useState, useCallback, memo } from "react";
import GeneralInput from "@/components/GeneralInput";
import Slogn from "@/components/Slogn";
import ChatView from "@/components/ChatView";
import DataListDrawer from "@/components/DataListDrawer";
import ColsAndDataDrawer from "@/components/DataListDrawer/ColsAndDataDrawer";

import { productList, defaultProduct, chatQustions } from "@/utils/constants";
import { Image } from "antd";
import { demoList } from "@/utils/constants";
import classNames from "classnames";

type HomeProps = Record<string, never>;

const Home: GenieType.FC<HomeProps> = memo(() => {
  const [inputInfo, setInputInfo] = useState<CHAT.TInputInfo>({
    message: "",
    deepThink: false,
  });
  const [product, setProduct] = useState(defaultProduct);
  const [videoModalOpen, setVideoModalOpen] = useState();
  const [dbsShow, setDbsShow] = useState(false);
  const [dataShow, setDataShow] = useState(false);
  const [curModel, setCurModel] = useState<CHAT.ModelInfo>({
    modelName: "",
    modelCode: "",
    schemaList: [],
  });

  const changeInputInfo = useCallback((info: CHAT.TInputInfo) => {
    setInputInfo(info);
  }, []);

  const toSendMessage = useCallback((query: Record<string, any>) => {
    setInputInfo({
      message: query.label,
      outputStyle: "dataAgent",
      deepThink: query.type === 2,
    });
  }, []);

  const showDetail = useCallback((modelInfo: any) => {
    setCurModel(modelInfo);
    setDataShow(true);
  }, []);

  const CaseCard = ({ title, description, tag, image, url, videoUrl }: any) => {
    return (
      <div className="group flex flex-col rounded-lg bg-white pt-16 px-16 shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.1)] hover:-translate-y-[5px] transition-all duration-300 ease-in-out cursor-pointer w-full max-w-xs border border-[rgba(233,233,240,1)]">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-[14px] font-bold truncate">{title}</div>
          <div className="shrink-0 inline-block bg-gray-100 text-gray-600 px-[6px] leading-[20px] text-[12px] rounded-[4px]">{tag}</div>
        </div>
        <div className="text-[12px] text-[#71717a] h-40 line-clamp-2 leading-[20px]">{description}</div>
        <div
          className="text-[#4040ff] group-hover:text-[#656cff] text-[12px] flex items-center mb-6 cursor-pointer transition-colors duration-200"
          onClick={() => window.open(url)}
        >
          <span className="mr-1">View page</span>
          <i className="font_family icon-xinjianjiantou"></i>
        </div>
        <div className="relative rounded-t-[10px] overflow-hidden h-100 group-hover:scale-105 transition-transform duration-500 ease">
          <Image
            style={{ display: "none" }}
            preview={{
              visible: videoModalOpen === videoUrl,
              destroyOnHidden: true,
              toolbarRender: () => null,
              onVisibleChange: () => {
                setVideoModalOpen(undefined);
              },
            }}
            src={image}
          />
          <img src={image} className="w-full h-full rounded-t-[10px] mt-[-20px]"></img>
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer rounded-t-[10px] group hover:bg-[rgba(0,0,0,0.6)] border border-[#ededed]"
            onClick={() => setVideoModalOpen(videoUrl)}
          >
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (inputInfo.message.length === 0) {
      return (
        <div className="pt-[120px] flex flex-col items-center">
          <Slogn />
          <div className="w-640 rounded-xl shadow-[0_18px_39px_0_rgba(198,202,240,0.1)]">
            <GeneralInput placeholder={product.placeholder} showBtn={true} size="big" disabled={false} product={product} send={changeInputInfo} dbsShow={setDbsShow} />
          </div>

          {/* 产品模式切换区域已删除 */}

          <div className="mt-80 mb-120 relative">
            {/* 漂浮的建议问题 */}
            <div
              className={classNames("absolute top-[-45px] p-0 w-full overflow-hidden transition-all duration-400 opacity-0", { "opacity-100 top-[-65px]": product.type === "dataAgent" })}
            >
              <div className="flex gap-x-[12px] justify-center ">
                {chatQustions.map((item, i) => (
                  <div
                    key={i}
                    className="text-[#52525B] cursor-pointer border border-[#E9E9F0] rounded-[8px] px-[16px] py-[4px] text-[14px] whitespace-nowrap flex items-center gap-[3px]"
                    onClick={() => toSendMessage(item)}
                  >
                    {item.type === 2 && <i className="font_family icon-shendusikao"></i>}
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
            {/* 优秀案例 */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Related web pages</h2>
              <p className="text-gray-500">Be informed of current events</p>
            </div>
            <div className="flex gap-16 mt-24">
              {demoList.map((demo, i) => (
                <CaseCard key={i} {...demo} />
              ))}
            </div>
          </div>
          {/* 模型列表 */}
          <DataListDrawer show={dbsShow} dbsShow={setDbsShow} showDetail={showDetail}></DataListDrawer>
          {/* 列字段和数据 */}
          {dataShow && <ColsAndDataDrawer show={dataShow} dataShow={setDataShow} modelInfo={curModel}></ColsAndDataDrawer>}
        </div>
      );
    }
    return (
      <div className="h-full w-full flex flex-col">
        <div className="w-full flex justify-start items-center p-16 border-b border-[#E9E9F0] bg-white">
          <button
            onClick={() => {
              setInputInfo({ message: "", deepThink: false });
              setDbsShow(false);
              setDataShow(false);
            }}
            className="flex items-center gap-8 px-12 py-6 text-[14px] text-[#666] hover:text-[#4040ff] transition-colors rounded-[8px] hover:bg-[rgba(64,64,255,0.05)]"
          >
            <i className="font_family icon-fanhui text-[16px]"></i>
            <span>back to homepage</span>
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatView inputInfo={inputInfo} product={product} />
        </div>
      </div>
    );
  };

  return <div className="h-full flex flex-col items-center ">{renderContent()}</div>;
});

Home.displayName = "Home";

export default Home;