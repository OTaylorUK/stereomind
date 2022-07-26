import { DataProp } from "editorjs-blocks-react-renderer";

export const formatAsMoney = (amount: number = 0, currency = "USD") =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    style: "currency",
    currency,
  }).format(amount);

export const parseEditorJSData = (jsonStringData?: string): DataProp | null => {
  if (!jsonStringData) {
    return null;
  }
  let data;
  try {
    data = JSON.parse(jsonStringData);
  } catch (e) {
    return null;
  }

  if (!data.blocks?.length) {
    // No data to render
    return null;
  }

  // Path for compatibility with data from older version od EditorJS
  if (!data.time) {
    data.time = Date.now().toString();
  }
  if (!data.version) {
    data.version = "2.22.2";
  }

  return data;
};

export interface Edge<T> {
  node: T;
}
export interface Connection<T> {
  edges: Array<Edge<T>> | undefined;
}


export function mapEdgesToItems<T>(data: Connection<T> | undefined | null): T[] {
  return data?.edges?.map(({ node }) => node) || [];
}


export const formatProductName = (name:  string) =>{
  let nameArr: string[] = name.replaceAll('-', ' ').split(' ')
  let niceName: string;

  if(nameArr?.includes('cd')){
    niceName = 'CD'
  }else if(nameArr?.includes('vinyl')){
    niceName = 'Vinyl'
  }else{
    niceName = nameArr.join(' ')
  }

  return niceName
}
