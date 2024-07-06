export default function Footer() {
  return (
    <footer className="h-12 mt-4 flex items-center gap-4 border-t bg-background px-4 md:px-6">
      <p className="text-xs">
        <span className="font-medium">Seat Scheduler</span> &copy;
        {new Date().getFullYear()}. Todos os direito reservados.
      </p>
    </footer>
  );
}
