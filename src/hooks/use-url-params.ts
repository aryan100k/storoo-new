import { useRouter, useSearchParams } from "next/navigation";

export const useURLParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = (key: string, value: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, value);

    router.replace("?" + newSearchParams.toString());
  };

  return { searchParams, updateParams };
};
