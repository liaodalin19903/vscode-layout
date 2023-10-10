import type { DataNode, DirectoryTreeProps } from 'antd/es/tree';


export function filterDataByKey(nodes: DataNode[], keys: string[]): DataNode[] {
  const filteredData: DataNode[] = [];

  nodes.forEach((node) => {
    const newNode: DataNode = { ...node };
    if (newNode.children) {
      newNode.children = filterDataByKey(newNode.children, keys);
    }
    if (keys.includes(newNode.key.toString()) || (newNode.children && newNode.children.length > 0)) {
      filteredData.push(newNode);
    }
  });

  return filteredData;
}
