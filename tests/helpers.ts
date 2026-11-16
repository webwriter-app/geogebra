export const SRC_A = "data:application/vnd.geogebra.file;base64,QUFBQQ=="
export const SRC_B = "data:application/vnd.geogebra.file;base64,QkJCQg=="

export const json = (src: string) => JSON.stringify({src})

export const wait = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms))

export async function until(condition: () => unknown, ms = 20000) {
  const end = performance.now() + ms
  while (performance.now() < end) {
    if (await condition()) return true
    await wait(50)
  }
  return false
}

export async function mount<T extends HTMLElement = any>(html: string): Promise<T> {
  const host = document.createElement("div")
  host.className = "test-mount"
  document.body.append(host)
  host.innerHTML = html
  const el = host.firstElementChild as any
  await Promise.race([
    customElements.whenDefined(el.localName),
    wait(5000).then(() => { throw new Error(el.localName + " is not defined") })
  ])
  await el.updateComplete
  return el
}

export function unmountAll() {
  document.querySelectorAll(".test-mount").forEach(host => host.remove())
  document.designMode = "off"
}

export const dataBlock = (el: Element) =>
  el.querySelector<HTMLScriptElement>(':scope > script[type="application/json"][slot="data"]')

export async function mountIn<T extends HTMLElement = any>(html: string, selector: string): Promise<T> {
  const host = document.createElement("div")
  host.className = "test-mount"
  document.body.append(host)
  host.innerHTML = html
  const el = host.querySelector(selector) as any
  await customElements.whenDefined(selector)
  await el.updateComplete
  return el
}
