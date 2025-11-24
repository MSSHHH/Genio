/**
 * 预览状态的tab选项
 */
import csvIcon from "@/assets/icon/CSV.png";
import docxIcon from "@/assets/icon/docx.png";
import excleIcon from "@/assets/icon/excle.png";
import pdfIcon from "@/assets/icon/pdf.png";
import txtIcon from "@/assets/icon/txt.png";
import htmlIcon from "@/assets/icon/HTML.png";
import demo1 from "@/assets/icon/demo1.png";
import demo2 from "@/assets/icon/demo2.png";
import demo3 from "@/assets/icon/demo3.png";
import demo4 from "@/assets/icon/demo4.png";

import { ActionViewItemEnum } from "./enums";

export const iconType: Record<string, string> = {
  doc: docxIcon,
  docx: docxIcon,
  xlsx: excleIcon,
  csv: csvIcon,
  pdf: pdfIcon,
  txt: txtIcon,
  html: htmlIcon,
};

export const actionViewOptions = [
  {
    label: "实时跟随",
    value: ActionViewItemEnum.follow,
    split: false,
  },
  {
    label: "浏览器",
    value: ActionViewItemEnum.browser,
  },
  {
    label: "文件",
    value: ActionViewItemEnum.file,
  },
];

export const defaultActiveActionView = actionViewOptions[0].value;

export const chatQustions = [
  { label: "Monthly Sales Trends for 2024", type: 1 },
  { label: "Top 10 best-selling products", type: 1 },
  { label: "Analysis of sales data", type: 1 },
  { label: "Analyze the sales performance of the product", type: 1 },
];

export const productList = [
  {
    name: "Question",
    img: "icon-xinjianduihua",
    type: "dataAgent",
    placeholder: "Genie will complete your data analysis task",
    color: "text-[#4040FF]",
  },
];

export const defaultProduct = productList[0];

export const RESULT_TYPES = ["task_summary", "result"];

export const InputSize: Record<string, string> = {
  big: "106",
  medium: "72",
  small: "32",
};

export const demoList = [
  {
    title: "Legislative Council Q&A",
    description: "Detailed Q&A Session of the Legislative Council on E-commerce Policies",
    videoUrl:
      "https://private-user-images.githubusercontent.com/49786633/469170308-065b8d1a-92e4-470a-bbe3-426fafeca5c4.mp4?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTM2OTE1NDIsIm5iZiI6MTc1MzY5MTI0MiwicGF0aCI6Ii80OTc4NjYzMy80NjkxNzAzMDgtMDY1YjhkMWEtOTJlNC00NzBhLWJiZTMtNDI2ZmFmZWNhNWM0Lm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MjglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzI4VDA4MjcyMlomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWNlOWNiZmZkMzdjNDUxODc4YjMyNDE1ZmU4ZjlmZjgwZjYxMzRlNWMwNmFlZjM1M2Q3ZDNlNDYzOTUzNmZlMTAmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.6OwtEGxcMnWlSCMgl0AaNy8NRl9lLuLx-nXrXdHLETg",
    url: "https://www.info.gov.hk/gia/general/202411/06/P2024110600415.htm?fontSize=1",
    image: demo1,
  },
  {
    title: "Government Policy",
    description: "The latest e-commerce policy issued by the Hong Kong Government",
    videoUrl:
      "https://private-user-images.githubusercontent.com/49786633/469171050-15dcf089-5659-489e-849d-39c651ca7e5a.mp4?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTM2OTE5ODgsIm5iZiI6MTc1MzY5MTY4OCwicGF0aCI6Ii80OTc4NjYzMy80NjkxNzEwNTAtMTVkY2YwODktNTY1OS00ODllLTg0OWQtMzljNjUxY2E3ZTVhLm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MjglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzI4VDA4MzQ0OFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTY0MDE1OWQ1NjNiNTcwZGY1ZTBhNzllNDhhMjM3M2E3YjQ3Mzc4ZjYwN2ExMWUxMTZjYzIwZWIzOGFhYjEzYjkmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.QqNCtSyGy20QbeNPPib6zVLpzPrcKmDMHJFphAwzx6E",
    url: "https://www.digitalpolicy.gov.hk/en/our_work/digital_government/policies_targets_measures/key_initiatives/2023pa_provide_epayment_options_and_support_mainland_ewallets/",
    image: demo2,
  },
  {
    title: "E-commerce White Paper",
    description: "New published 2025 Hong Kong E-commerce White Paper",
    videoUrl:
      "https://private-user-images.githubusercontent.com/49786633/469171112-cd99e2f8-9887-459f-ae51-00e7883fa050.mp4?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTM2OTE5ODgsIm5iZiI6MTc1MzY5MTY4OCwicGF0aCI6Ii80OTc4NjYzMy80NjkxNzExMTItY2Q5OWUyZjgtOTg4Ny00NTlmLWFlNTEtMDBlNzg4M2ZhMDUwLm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MjglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzI4VDA4MzQ0OFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTA2MDNiNDk5MThlZTRhMTY0YTM0YWQ1MGU2NDRlYzg1NWIxNDM4ZmYyMmE1MTY2YzgwZmUyOTI1MjY3NjFiNTQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.-r9MhEJ9RgbYPi-cTCmG0wMxNmFC0rjXNMti4LRvspc",
    url: "https://blog.shopline.hk/whitepaper2025/",
    image: demo3,
  },
  {
    title: "Regulation of cross-border online shopping: LCQ",
    description: "Legislative Council's detailed questions and answers regarding strengthening cross-border e-commerce supervision",
    videoUrl:
      "https://private-user-images.githubusercontent.com/49786633/469171151-657bbe61-5516-4ab9-84c2-c6ca75cc4a6f.mp4?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NTM2OTE5ODgsIm5iZiI6MTc1MzY5MTY4OCwicGF0aCI6Ii80OTc4NjYzMy80NjkxNzExNTEtNjU3YmJlNjEtNTUxNi00YWI5LTg0YzItYzZjYTc1Y2M0YTZmLm1wND9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA3MjglMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNzI4VDA4MzQ0OFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTJkMDNlNTkxNzFkNjFlYTI1MTAzNTIyZWM0YzA1MzE5MTY4NDYyYTg5MjUxZWY0Mjg0OWU1ODUxNGZkNTU3ZTEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.BRatyWFZm91TAvRn1iss7DMPWLXIoRm9geqaN6af7cI",
    url: "https://www.info.gov.hk/gia/general/202509/25/P2025092500595.htm?fontSize=1",
    image: demo4,
  },
];
