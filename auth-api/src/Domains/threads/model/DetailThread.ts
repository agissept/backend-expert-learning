import DetailComment from '../../comment/model/DetailComment'

interface DetailThread{
    id: string,
    title: string,
    body: string,
    date: string
    username: string,
    comments: Array<DetailComment>
}

export default DetailThread
