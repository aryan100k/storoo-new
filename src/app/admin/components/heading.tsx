import { PropsWithChildren } from "react";

export const Heading = (props: PropsWithChildren) => {
  return <h1 className="md:text-xl text-lg font-medium mb-2">{props.children}</h1>;
};
