import axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

const config = axios.create({
  baseURL: 'https://nitetop.local/api',
  withCredentials: true,
});

const useAxios = makeUseAxios({
  axios: config,
});

// const Request =

// function axiosRequest<T>(config: AxiosRequestConfig): {data?:T, info:{ response?: AxiosResponse<T> | null; error: { err: boolean; object: Object | null; }; }} {
//   const [error, setError] = useState<{ err: boolean, object: Object | undefined }>({ err: false, object: null });
//   const [response, setResponse] = useState<AxiosResponse<T> | undefined>(undefined);

//   useEffect(() => {
//     const source = axios.CancelToken.source();
//     let unmounted = false;

//     Request({ ...config, cancelToken: source.token })
//       .then((res) => {
//         if (!unmounted) {
//           setResponse(res);
//         }
//       }).catch((err) => {
//         if (!unmounted) {
//           setError({ err: true, object: err });
//         }
//       });

//     return () => {
//       unmounted = true;
//       source.cancel('Cancelling in cleanup');
//     };
//   }, [config]);

//   return {
//     data: response.data,
//     info: { response, error },
//   };
// }

export default useAxios;
export { config as Request };
