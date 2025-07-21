import { useReactiveClient } from "@dynamic-labs/react-hooks";
import { dynamicClient } from "@/clients/dynamic";

export const useDynamic = () => useReactiveClient(dynamicClient);
