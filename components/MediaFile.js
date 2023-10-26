import Image from "next/image";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import imagePlaceholder from "@/assets/img/image-placeholder.png";
import videoPlaceholder from "@/assets/img/video-placeholder.png";
import { isVideo } from "@/utils/validation";

const MediaFile = ({ filePath, fileName, alt, onClose = () => {} }) => {
  return (
    <section className="w-36 max-h-40 flex flex-col justify-end relative overflow-hidden p-3">
      <DisabledByDefaultIcon
        className="absolute top-0 right-0 lg:text-gray-900/10 hover:text-red-800 text-red-800 cursor-pointer"
        onClick={onClose}
      />
      <a className="flex flex-col items-center" href={filePath} target="_blank">
        <Image
          src={isVideo(fileName) ? videoPlaceholder.src : filePath}
          placeholder="blur"
          blurDataURL={
            isVideo(fileName) ? videoPlaceholder.src : imagePlaceholder.src
          }
          width={100}
          height={100}
          alt={alt || fileName}
          style={{ objectFit: "contain", objectPosition: "center center" }}
        />
        <p className="text-gray-600 truncate text-xs w-36 text-center">
          {fileName}
        </p>
      </a>
    </section>
  );
};

export default MediaFile;
