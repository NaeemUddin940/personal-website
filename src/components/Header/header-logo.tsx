import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "../ui/tooltip";

export default function HeaderLogo() {
  return (
    <Tooltip content="Home" position="right">
      <Link href="/" className="flex items-center gap-2">
        <Image
          height={40}
          width={40}
          className="object-cover"
          src="/PollenPop.png"
          alt="PollenPop logo"
        />
        <span className="text-lg font-bold tracking-widest leading-4 text-primary">
          Pollen <br /> Pop
        </span>
      </Link>
    </Tooltip>
  );
}
