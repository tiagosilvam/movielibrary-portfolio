import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100dvh-64px)] flex-col items-center justify-center px-4 py-12">
      <div className="mx-auto max-w-md space-y-4 text-center">
        <h1 className="text-8xl font-bold tracking-tight">404</h1>
        <p className="text-lg">
          Oops, parece que a página que você procura não existe.
        </p>
        <Link href="/" className={buttonVariants()}>
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
