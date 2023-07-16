import { Configuration, OpenAIApi } from 'openai'
const config = useRuntimeConfig();

const configuration = new Configuration({
  apiKey: config.openaiApiKey
});
const openaiApi = new OpenAIApi(configuration);

export default defineEventHandler(async (event) => {

  const { prompt } = (await readBody(event)) as { prompt: string };

  try {
    const response = await openaiApi.createImage({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'url'
    })
    return {
      statusCode: 200,
      image: response.data.data[0].url || ''
    }
  } catch (error: any) {
    console.log(error);
    return {
      statusCode: 500,
      message: `${error}`,
    };
  }
});