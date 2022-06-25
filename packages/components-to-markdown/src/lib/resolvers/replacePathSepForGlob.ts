export default function replacePathSepForGlob(path: string): string {
  return path.replace(/\\(?![{}()+?.^$])/g, '/');
}
