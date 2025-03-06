import { Link, useParams, useSearchParams } from "react-router";
import FileKeepIcon from "../../components/home/FileKeepIcon";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getShareableFile } from "../../endpoints/ShareableLinkEndpoint";
import { FC, useEffect, useState } from "react";

const ShareableLinkPage = () => {
  const { authUser } = useAuth();
  const [searchParams] = useSearchParams();
  const { token } = useParams();
  const type = searchParams.get("t");
  const { data } = useQuery({
    queryKey: [`get-shareable-${type === "0" ? "file" : "folder"}`],
    queryFn: () => getShareableFile(token!),
  });

  return (
    <main className="h-full w-full flex flex-col bg-[#0d1117]">
      <header className="flex bg-[#151B23] text-gray-100">
        <Link to="/">
          <FileKeepIcon width="60" height="60" viewBox="0 0 375 375" />
        </Link>
      </header>
      {type === "0" && <FileView blob={data || new Blob()} />}
      {type === "1" && <FolderView />}
    </main>
  );
};

const FolderView = () => {
  return <div></div>;
};

const FileView: FC<FileViewProps> = ({ blob }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const getText = async () => {
      const text = await blob.text();
      setText(text);
    };
    getText();
  }, [blob]);

  console.log(text);

  return (
    <div>
      <div className="text-white">FileView</div>
      <pre>{text}</pre>
    </div>
  );
};

export default ShareableLinkPage;
