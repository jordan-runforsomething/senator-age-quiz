import styles from "./styles/componentStyles.module.scss"

export default function Header() {
  return (
    <div className="fixed top-0 right-0 p-4 !z-50 bg-black/50 rounded">
      Created by&nbsp;
      <a
        href="https://www.linkedin.com/in/jordan-haines-92653b38/"
        target="_blank"
        className="text-white bg-blue inline-block px-2 hover:scale-125 transition-transform"
      >
        <b>&nbsp;👨🏽‍💻&nbsp;Jordan&nbsp;</b>
      </a>{" "}
      in Minneapolis
    </div>
  )
}
