import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
    children: string;
    path: string;
};

export default function NavLink({ path, children }: Props) {
    const router = useRouter();
    const productPagePathArr = router.asPath.split("/");
    const productPagePath = productPagePathArr[productPagePathArr.length - 1];
    const isActive =
        router.asPath === `${path}` ||
        router.asPath === `${path}/${productPagePath}`
            ? "text-[#e33f3f]"
            : "";

    return (
        <Link className={isActive} href={`${path}`}>
            {children}
        </Link>
    );
}
