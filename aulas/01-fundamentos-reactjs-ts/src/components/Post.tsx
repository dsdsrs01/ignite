import { format, formatDistanceToNow } from 'date-fns' //Para datas 
import ptBr from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar';
import { Comment } from './Comment';

import styles from './Post.module.css'
import { FormEvent, useState, ChangeEvent, InvalidEvent } from 'react';

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: 'paragraph' | 'link'; //Quando sabemos que a informação só pode ser uma coisa ou outra.
  content: string;
}

export interface PostType { //Faz um export pra chamar dentro do App.tsx
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) { //Formatação da hora.
  //Estados(State)
  const [ comments, setComments ] = useState([
    'Post muito bacana, em?!'
  ])

  const [newCommentText, setNewCommentText] = useState('')

  console.log(newCommentText);

  //Formatação da data. npm i date-fns
  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'as' HH:mm'h'", {
    locale: ptBr,
  })

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBr,
    addSuffix: true
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault() //Sigle page, não faz redirecionamentos para outro lugar.

    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommenteChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity(''); //inicia zerado o comentário
    setNewCommentText(event.target.value);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório')
  } //Altera a mensagem do campo de alerta do botão, se caso n preencher nada

  function deleteComment(commentToDelete: string) {
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
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>
        {/*Mostra a hora que foi colocar para o post*/} 
        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time> 
      </header>
      <div className={styles.content}>
        {
          post.content.map(line => {
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