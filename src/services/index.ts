import { baseApi } from "./config";

export const getPlayList = async () => {
  try {
    const { data: { data: list = [] } = {} } = (await baseApi.get("/items/songs")) ?? {};
    return list;
  } catch(error){
    console.error("Error fetching music playlists:", error);
    throw error;
  };
};

export const getMusicCover = async (coverKey: string) => {
  try {
    const response = await baseApi.get(`/assets/${coverKey}`, {
      responseType: "arraybuffer",
    });

    const contentType = response.headers["content-type"];
    const data = response.data;

    // Convert array buffer to base64
    const base64 = btoa(
      new Uint8Array(data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );

    return `data:${contentType};base64,${base64}`;
  } catch (error) {
    console.error("Error fetching music cover:", error);
    throw error;
  }
};
