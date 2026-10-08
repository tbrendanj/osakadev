import Image from 'next/image';
import styles from "./LogoArray.module.css";

export interface LogoArrayProps {
  logoUrlArray: string[];
}

export default function LogoArray({
  logoUrlArray
}: LogoArrayProps) {
  return <div className={`${styles.logo_array} ${"horizontally_centered"}`}>
    {logoUrlArray.map(logoUrl => 
      <Image src={logoUrl} width={75} height={75}></Image>
    )}
  </div>;
}
