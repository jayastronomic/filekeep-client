import { FC } from "react";

const ErrorBanner: FC<ErrorBannerProps> = ({ message }) => {
  return (
    <div className="text-gray-200 border border-red-700 bg-[rgba(255,0,0,0.3)] w-[18rem] p-4 rounded text-sm mt-8">
      {message}
    </div>
  );
};

export default ErrorBanner;
