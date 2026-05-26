import { LinkDirectory } from "@/components/link-directory";
import { uiLinks } from "@/data/links";

export default function Home() {
  return <LinkDirectory links={uiLinks} />;
}
