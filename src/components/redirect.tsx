import { redirect } from "next/navigation";

type Props = {
  path: string;
};

export default function Redirect({ path }: Props) {
  return redirect(path);
}
