import { Header } from './components/Header'; /*Importação de um componente*/ 
import { Sidebar } from './components/Sidebar';
import { Post, PostType } from './components/Post';

import styles from './App.module.css';

import './global.css'

// author: { avatar_url: "", name: "", role: "" }
// publishedAt: Date
// Content: String

//Banco de dados simulado.
const posts: PostType[] = [
  {
    id: 1,
    author : {
      avatarUrl: 'https://github.com/dsdsrs.png',
      name: 'Yuri B Fernandes',
      role: 'Developer Web'
    },
    content: [
        {type: 'paragraph', content: 'Fala Galera 😁'},
        {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portfolio. É um projeto que fiz no NLW return, evento...'},
        {type: 'link', content:'Jane.design/doctorcare 😜'},
    ],
    publishedAt: new Date('2022-06-25 20:00:00'),
  },
  {
    id: 2,
    author : {
      avatarUrl: 'https://github.com/maykbrito.png',
      name: 'Mayk Brito',
      role: 'Educator @Rocketseat'
    },
    content: [
        {type: 'paragraph', content: 'Fala Galera 😁'},
        {type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portfolio. É um projeto que fiz no NLW return, evento...'},
        {type: 'link', content:'Jane.design/doctorcare 😜'},
    ],
    publishedAt: new Date('2022-06-26 20:00:00'),
  }
]

export function App() {
  return (
    <>
      <Header /> {/*Usando components*/}
      
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {
            posts.map(post => {
              return (   
                  <Post 
                    key={post.id}
                    post={post}
                  />
              ) 
            })
          }
        </main>
      </div>
    </>   
  ) 
} 