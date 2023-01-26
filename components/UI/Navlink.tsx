import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
    children: string;
    path: string;
};

export default function NavLink({ path, children }: Props) {
    const router = useRouter();
    const isActive = router.asPath === `${path}` ? "text-[#e33f3f]" : "";

    return (
        <Link className={isActive} href={`${path}`}>
            {children}
        </Link>
    );
}
