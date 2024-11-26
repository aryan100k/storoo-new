import { PropsWithChildren } from "react";

export const Heading = (props: PropsWithChildren) => {
  return <h1 className="md:text-xl text-lg font-medium">{props.children}</h1>;
};
