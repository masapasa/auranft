// server/api/generate/index.post.ts
import { Configuration, OpenAIApi } from 'openai'
import Message from 'primevue/message';
const config = useRuntimeConfig();

const configuration = new Configuration({
  apiKey: config.openaiApiKey
});
const openaiApi = new OpenAIApi(configuration);

export default defineEventHandler(async (event) => {

  const { prompt } = (await readBody(event)) as { prompt: string };

  try {
    const response = await openaiApi.createChatCompletion({
      model: "gpt-3.5-turbo-16k",
      messages: [{role:"user",content:`summarize this ${prompt} in one sentence`}],
    });
    console.log(response.data.choices[0].message?.content);
    if (!response.data.choices[0].message?.content) {
      return {
        statusCode: 500,
        message: `${response.data.choices[0].message}`,
      };
    } else {
      return {
        statusCode: 200,
        summary: response.data.choices[0].message.content || ''
      }
    }
  } catch (error: any) {
    console.log(error);
    return {
      statusCode: 500,
      message: `${error}`,
    };
  }
});




// import { Configuration, OpenAIApi } from 'openai'
// const config = useRuntimeConfig();

// const configuration = new Configuration({
//   apiKey: config.openaiApiKey
// });
// const openaiApi = new OpenAIApi(configuration);

// export default defineEventHandler(async (event) => {

//   const {prompt} = (await readBody(event)) as { prompt: string };

//   try {
//     const response = await openaiApi.createImage({
//       prompt: prompt,
//       n: 1,
//       size: '1024x1024',
//       response_format: 'url'
//     })
//     return {
//       statusCode: 200,
//       image: response.data.data[0].url || ''
//     }
//   } catch (error: any) {
//     console.log(error);
//     return {
//       statusCode: 500,
//       message: `${error}`,
//     };
//   }
// });