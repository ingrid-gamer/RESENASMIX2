export default function Loading({ text = 'Cargando...' }) {
  return <div className="text-center py-5 text-muted-soft" role="status"><div className="spinner-border spinner-border-sm me-2" />{text}</div>
}
