import { Link, useParams, useSearchParams } from "react-router";
import FileKeepIcon from "../../components/home/FileKeepIcon";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getShareableFile } from "../../endpoints/ShareableLinkEndpoint";
import { FC, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { base64ToBlob } from "../../helpers/base64ToBlob";
import { LiaDownloadSolid } from "react-icons/lia";

const ShareableLinkPage = () => {
  const { authUser } = useAuth();
  const [searchParams] = useSearchParams();
  const { token } = useParams();
  const type = searchParams.get("t");
  const { data, isLoading } = useQuery({
    queryKey: [`get-shareable-${type === "0" ? "file" : "folder"}`],
    queryFn: () => getShareableFile(token!),
  });

  const { data: fileData } = data || {};
  const blob = base64ToBlob(
    fileData || ({ content: "", mimeType: "" } as ShareableFileData)
  );

  const downloadFile = () => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileData?.fileName || "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <main className="h-full w-full flex flex-col bg-[#0d1117] overflow-auto">
      <header className="flex items-center justify-between pr-6 bg-[#151B23] text-gray-100">
        <div className="flex items-center">
          <Link className="" to="/">
            <FileKeepIcon width="60" height="60" viewBox="0 0 375 375" />
          </Link>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">
              {fileData?.fileName.split(".")[0]}
            </span>
            <span className="font-semibold text-gray-600">
              {fileData?.mimeType.split("/")[1].toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex">
          <button onClick={downloadFile} className="relative group">
            <LiaDownloadSolid className="text-2xl" />
            <div className="hidden absolute -right-5 top-7 text-xs bg-black p-2 rounded-md group-hover:block">
              Download
            </div>
          </button>
        </div>
      </header>
      {type === "0" && <FileView isLoading={isLoading} blob={blob} />}
      {type === "1" && <FolderView />}
    </main>
  );
};

const FolderView = () => {
  return <div></div>;
};

const FileView: FC<FileViewProps> = ({ blob, isLoading }) => {
  const renderBlobView = (blob: Blob) => {
    const [type] = blob.type.split("/");
    switch (type) {
      case "text":
        return <TextAsset blob={blob} />;
      case "image":
        return <ImageAsset blob={blob} />;
      default:
        return;
    }
  };

  return (
    <div className="flex items-center justify-center h-full p-10">
      {isLoading ? <MoonLoader /> : renderBlobView(blob)}
    </div>
  );
};

const TextAsset: FC<TextAssetProps> = ({ blob }) => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const getText = async () => {
      const text = await blob.text();
      setLines(text.split("\n"));
    };
    getText();
  }, [blob]);

  return (
    <div className="flex bg-black w-full h-full text-gray-200 space-x-6 p-4 border border-gray-800 overflow-auto max-w-[60rem]">
      <pre>
        {lines.map((_, index) => {
          if (index === lines.length - 1) return;
          return <div key={index}>{index + 1}</div>;
        })}
      </pre>
      <pre className="flex-1">
        {lines.map((line, index) => {
          return <div key={index}>{line}</div>;
        })}
      </pre>
    </div>
  );
};

const ImageAsset: FC<ImageAssetProps> = ({ blob }) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(URL.createObjectURL(blob));
    return () => {
      window.URL.revokeObjectURL(url);
    };
  }, [url]);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <img className="w-full h-full max-w-full object-contain" src={url} />
    </div>
  );
};

export default ShareableLinkPage;
