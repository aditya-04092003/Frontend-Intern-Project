import App from './beautifuldnd.js'
import item from './abc.json'
import column from './columnData.json'

export default function Form() {
  return (
    <div className="Form">
      <div className="container" style={{
        display: 'flex',

      }}>
        <section className="section">
          <App item={item} column={column}/>
        </section>
        <section className="section">
          </section>  
      </div>  
    </div>
    )
}