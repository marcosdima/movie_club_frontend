import { useEffect, useState } from "react";
import genericService from "../services/genericService";
import { useSelector } from "react-redux";

const Comment = ({ writer, text, deleteThis, id }) => {
    return (
        <div className="comment">
            <p>{writer}: {text}</p> <button onClick={() => deleteThis(id)}>x</button>
        </div>
    );
}

const CommentsDisplay = ({ activityId }) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const group = useSelector((state) => state.group);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        const getComments = async () => setComments(await genericService.getAll(`comments/${activityId}`));
        if (group && activityId) getComments();
    }, [group])

    const commentSomething = async () => {
        try {
            const comment = await genericService.create('comments', {
                activity: activityId,
                content: text
            });
            setComments(comments.concat(comment));
            setText('');
        } catch(error) {
            console.log(error);
        }
    };

    const deleteComment = async (commentId) => {
        try {
            await genericService.remove('comments', commentId);
            setComments(comments.filter(({ id }) => commentId !== id));
        } catch (error) {
            console.log(error);
        }
    };

    if (!group || !activityId) return <></>;

    return (
        <div className='comments'>
            <h3>Comments:</h3>
            <div className="comments-body">
                {
                    comments.map((({ content, writer: { name }, id }) => (
                        <Comment 
                            key={id} 
                            deleteThis={deleteComment} 
                            writer={name} 
                            text={content} 
                            id={id} 
                        />
                    )))
                }
            </div>    
            <div>
                Comment something: 
                <input type="text" onChange={({ target }) => setText(target.value)} value={text} />
                <button onClick={() => commentSomething()}>Send</button>
            </div>
        </div>
    )
};

export default CommentsDisplay;