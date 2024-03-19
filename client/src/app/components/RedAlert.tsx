
interface RedAlertProps{
  alertClass : string;
  alert : string;
}

export default function RedAlert(props : RedAlertProps) {
    return (
            <div role="alert" className={props.alertClass}>
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Alerta
              </div>
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <p>{props.alert}</p>
              </div>
            </div>
    )
}