type TProps = {
  type: 'source' | 'parsed'
  output?: string
  input?: (params: React.ChangeEvent) => void
}

export const TextField: React.FC<TProps> = (props): JSX.Element => (
  <>
    <div className="wrapper">
      <div className="h3">{props.type}</div>
      {props.type === 'source' ? (
        <div className="text-field source p-3 my-3 c-border-primary">
          <textarea
            onChange={props.input}
            value={props.output}
            placeholder="enter markdown code OR click the example button"
          />
        </div>
      ) : (
        <div className="text-field parse p-3 my-3 c-border-info overflow-auto">
          <div
            className="insertWrapper"
            dangerouslySetInnerHTML={{ __html: props.output }}
          />
        </div>
      )}
    </div>
    <style jsx>{`
      .wrapper {
        width: 100%;
        text-align: center;
      }
      .text-field {
        width: 100%;
        height: 550px;
        border-width: 2.5px;
      }
      textarea {
        color: inherit;
        outline: none;
        border: none;
        background: none;
        resize: none;
        width: 100%;
        height: 100%;
      }
      .insertWrapper {
        width: 100%;
        height: 100%;
      }
    `}</style>
  </>
)
export default TextField
