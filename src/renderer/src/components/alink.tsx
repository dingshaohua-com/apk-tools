export default function ALink(props: { href: string; children: React.ReactNode }) {
    return (
        <span onClick={() => electron.ipcRenderer.invoke('openLink', props.href)} className="text-blue-400 cursor-pointer">
            {props.children}
        </span>
    );
}