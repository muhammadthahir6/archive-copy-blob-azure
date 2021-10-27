import styles from '../styles/Home.module.css'
import axios from 'axios'

export default function Home() {

  const runAPI = async () => {
    const resp = await axios.post('/api/azureAPI', {run:'run api'})
  }

  return (
    <div className={styles.container}>
      <button onClick={runAPI}>RUN API</button>
    </div>
  )
}
