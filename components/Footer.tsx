export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 text-sm text-gray-500 flex flex-col md:flex-row items-center justify-between gap-3">
        <div>© {new Date().getFullYear()} Luis Tupac</div>
        <div className="flex gap-4">
          <a className="underline" href="https://www.linkedin.com/in/luis-tupac1" target="_blank">LinkedIn</a>
          <a className="underline" href="https://github.com/luchomame" target="_blank">GitHub</a>
          <a className="underline" href="/Luis_Tupac_Resume.pdf" target="_blank">Resume</a>
        </div>
      </div>
    </footer>
  );
}
