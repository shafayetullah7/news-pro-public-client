import axios from "axios";

const useImgbb = (imgfile) =>{
    const body = new FormData()
    body.set('key', import.meta.env.IMGBB_KEY);
    body.append('image', imgfile)

    return axios({
      method: 'post',
      url: 'https://api.imgbb.com/1/upload',
      data: body
    })
}

export default useImgbb