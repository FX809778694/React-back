export default function logError(err, { level = 'error', service = '' } = {}) {
  // eslint-disable-next-line
  /* eslint no-console:0 */
  if (window.console && console.error) console.error(err);
}
