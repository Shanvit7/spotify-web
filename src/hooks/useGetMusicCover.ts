// UTILS
import { useQuery } from '@tanstack/react-query';
// SERVICE
import { getMusicCover } from '@/services';

const  useGetMusicCover = (coverKey: string = '')=>{
    return useQuery({
        queryKey: ['musicCover',coverKey],
        queryFn: ()=> getMusicCover(coverKey),
        enabled: !!coverKey,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export default useGetMusicCover;