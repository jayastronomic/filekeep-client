import { Link, useLocation, useParams } from "react-router";
import FileKeepIcon from "../../components/home/FileKeepIcon";
import { useQuery } from "@tanstack/react-query";
import { getShareableFile } from "../../endpoints/ShareableLinkEndpoint";
import { FC, useContext, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { base64ToBlob } from "../../helpers/base64ToBlob";
import { LiaDownloadSolid } from "react-icons/lia";
import { AuthContext } from "../../components/contexts/AuthContext";
import Registrations from "../../components/registrations/Registrations";
import RequestAccessSVG from "../../components/assets/RequestAccessSVG";
import FileKeepTextSvg from "../../components/home/FileKeepTextSvg";
import NotFound from "../../components/errors/NotFound";

const ShareableLinkPage: FC = () => {
  const { token } = useParams();
  const { authUser } = useContext(AuthContext);

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-shareable-file"],
    queryFn: () => getShareableFile(token!),
    retry: false,
  });

  if (error && error.name === "NotFoundError") return <NotFound />;

  if (data) {
    const { data: fileData } = data;
    const needsAuthentication =
      fileData.linkAccessType === "PRIVATE" && !authUser;

    const isPrivate =
      fileData.linkAccessType === "PRIVATE" &&
      fileData.ownerId !== authUser?.id;

    return (
      <main className="h-full w-full flex flex-col bg-[#0d1117] overflow-auto">
        {needsAuthentication ? (
          <Protected token={token || ""} assetName={fileData.fileName}>
            <FileView />
          </Protected>
        ) : (
          <>
            {isLoading ? (
              <div className="flex w-full h-full items-center justify-center">
                <MoonLoader color="gray" />
              </div>
            ) : isPrivate ? (
              <RequestAcess />
            ) : (
              <FileView fileData={fileData} />
            )}
          </>
        )}
      </main>
    );
  }
};

const RequestAcess: FC = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <div className="flex flex-col bg-[#0d1117] h-full w-full">
      <header className="flex">
        <Link className="flex items-center" to="/">
          <FileKeepIcon width="60" height="60" viewBox="0 0 375 375" />
          <FileKeepTextSvg
            width="90"
            height="35"
            viewBox="70 120 280 102"
            className="relative right-4"
          />
        </Link>
      </header>
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h1 className="text-3xl text-gray-200">Request Access</h1>
        <RequestAccessSVG viewBox="80 80 200 190" height="200" width="200" />
        <div className="text-gray-400 text-center mt-20">
          <span>You don't have access to this content. You're signed as </span>
          <span className="font-semibold text-gray-100">{authUser?.email}</span>
        </div>
      </div>
    </div>
  );
};

const Protected: FC<ProtectProps> = ({ children, assetName, token }) => {
  return (
    <div>
      <div className="fixed flex justify-center h-full w-full bg-gray-400/20 z-10 py-20">
        <Registrations
          classes={
            "md:max-w-[40rem] md:border md:border-gray-500 md:rounded-lg md:shadow-2xl"
          }
          secured
          assetName={assetName}
          token={token}
        />
      </div>
      <>{children}</>
    </div>
  );
};

const FileView: FC<FileViewProps> = ({ fileData }) => {
  const blob = base64ToBlob(
    fileData || ({ content: "", mimeType: "" } as ShareableFileData)
  );

  const downloadFile = () => {
    if (blob.size === 0) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileData?.fileName || "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

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
    <>
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
        <div className="flex relative">
          <button onClick={downloadFile} className="group">
            <LiaDownloadSolid className="text-2xl" />
            <div className="hidden absolute -right-5 top-7 text-xs bg-black p-2 rounded-md group-hover:block">
              Download
            </div>
          </button>
        </div>
      </header>
      <div className="flex flex-col items-center justify-center h-full p-10">
        {!fileData ? <></> : renderBlobView(blob)}
      </div>
    </>
  );
};

const TextAsset: FC<TextAssetProps> = ({ blob }) => {
  const { pathname } = useLocation();
  const [lines, setLines] = useState<string[]>([]);
  const isProtected = pathname.startsWith("/profile");

  useEffect(() => {
    const getText = async () => {
      const text = await blob.text();
      setLines(text.split("\n"));
    };
    getText();
  }, [blob]);

  return (
    <>
      {!isProtected && (
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
      )}
    </>
  );
};

const ImageAsset: FC<ImageAssetProps> = ({ blob }) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    setUrl(URL.createObjectURL(blob));
    return () => {
      window.URL.revokeObjectURL(url);
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <img className="w-full h-full max-w-full object-contain" src={url} />
    </div>
  );
};

export default ShareableLinkPage;
