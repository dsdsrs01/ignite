import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css'
import { useState } from 'react';

export function Post({ author, content, publishedAt }) { //Formatação da hora.
  //Estados(State)
  const [ comments, setComments ] = useState([
    'Post muito bacana, em?!'
  ])

  const [newCommentText, setNewCommentText] = useState('')

  console.log(newCommentText);

  //Formatação da data. npm i date-fns
  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'as' HH:mm'h'", {
    locale: ptBr,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBr,
    addSuffix: true
  })

  function handleCreateNewComment() {
    event.preventDefault() //Sigle page, não faz redirecionamentos para outro lugar.

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommenteChange() {
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid() {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  function deleteComment(commentToDelete) {
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment != commentToDelete; //True mantem, False excluí
    })

    setComments(commentsWithoutDeletedOne);
  }  

  const isNewCommentEmpty = newCommentText.length == 0;

  return(
    <article className={styles.post}> 
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        {/*Mostra a hora que foi colocar para o post*/} 
        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time> 
      </header>
      <div className={styles.content}>
        {
          content.map(line => {
            if(line.type == 'paragraph') {
              return <p key={line.content}>{line.content}</p>
            } else if (line.type == 'link') {
              return <p key={line.content}><a href="#">{line.content}</a></p>
            }
          })
        }
      </div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea //Modelos de TextAreas.
          name='comment' 
          placeholder='Deixe um comentário'
          value={newCommentText}
          onChange={handleNewCommenteChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type='submit' disabled={isNewCommentEmpty}>
            Públicar
          </button> 
        </footer>
      </form>

      <div className={styles.commentList}>
      {
        comments.map( comment => {
          return(
            // eslint-disable-next-line react/jsx-key
            <Comment 
              key={comment} 
              content={comment} 
              onDeleteComment={deleteComment}
            />
          )
        })
      }
      </div>
    </article>
  );
}