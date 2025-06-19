import { FileTypesList } from '../types/upload';

export const MAX_FILE_SIZE = 500 * 1024; // 50KB
export const MAX_FORM_DATA_SIZE = 1024 * 1024; // 1MB

export const fileTypes: FileTypesList = {
  images: {
    png: { mime: 'image/png', extension: 'PNG' },
    jpg: { mime: 'image/jpeg', extension: 'JPG' },
    jpeg: { mime: 'image/jpeg', extension: 'JPEG' },
    gif: { mime: 'image/gif', extension: 'GIF' },
    webp: { mime: 'image/webp', extension: 'WebP' },
    svg: { mime: 'image/svg+xml', extension: 'SVG' },
    bmp: { mime: 'image/bmp', extension: 'BMP' },
    ico: { mime: 'image/x-icon', extension: 'ICO' },
    tiff: { mime: 'image/tiff', extension: 'TIFF' },
  },
  videos: {
    mp4: { mime: 'video/mp4', extension: 'MP4' },
    avi: { mime: 'video/x-msvideo', extension: 'AVI' },
    mov: { mime: 'video/quicktime', extension: 'MOV' },
    wmv: { mime: 'video/x-ms-wmv', extension: 'WMV' },
    flv: { mime: 'video/x-flv', extension: 'FLV' },
    webm: { mime: 'video/webm', extension: 'WebM' },
    mkv: { mime: 'video/x-matroska', extension: 'MKV' },
    m4v: { mime: 'video/x-m4v', extension: 'M4V' },
    '3gp': { mime: 'video/3gpp', extension: '3GP' },
  },
  audios: {
    mp3: { mime: 'audio/mpeg', extension: 'MP3' },
    wav: { mime: 'audio/wav', extension: 'WAV' },
    aac: { mime: 'audio/aac', extension: 'AAC' },
    ogg: { mime: 'audio/ogg', extension: 'OGG' },
    wma: { mime: 'audio/x-ms-wma', extension: 'WMA' },
    flac: { mime: 'audio/flac', extension: 'FLAC' },
    m4a: { mime: 'audio/mp4', extension: 'M4A' },
  },
  documents: {
    pdf: { mime: 'application/pdf', extension: 'PDF' },
    doc: { mime: 'application/msword', extension: 'DOC' },
    docx: {
      mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      extension: 'DOCX',
    },
    xls: { mime: 'application/vnd.ms-excel', extension: 'XLS' },
    xlsx: {
      mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      extension: 'XLSX',
    },
    ppt: { mime: 'application/vnd.ms-powerpoint', extension: 'PPT' },
    pptx: {
      mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      extension: 'PPTX',
    },
    txt: { mime: 'text/plain', extension: 'TXT' },
    rtf: { mime: 'application/rtf', extension: 'RTF' },
    csv: { mime: 'text/csv', extension: 'CSV' },
  },
  archives: {
    zip: { mime: 'application/zip', extension: 'ZIP' },
    rar: { mime: 'application/vnd.rar', extension: 'RAR' },
    '7z': { mime: 'application/x-7z-compressed', extension: '7Z' },
    tar: { mime: 'application/x-tar', extension: 'TAR' },
    gz: { mime: 'application/gzip', extension: 'GZ' },
  },
  code: {
    js: { mime: 'application/javascript', extension: 'JS' },
    ts: { mime: 'application/typescript', extension: 'TS' },
    jsx: { mime: 'text/jsx', extension: 'JSX' },
    tsx: { mime: 'text/tsx', extension: 'TSX' },
    html: { mime: 'text/html', extension: 'HTML' },
    css: { mime: 'text/css', extension: 'CSS' },
    scss: { mime: 'text/x-scss', extension: 'SCSS' },
    sass: { mime: 'text/x-sass', extension: 'SASS' },
    json: { mime: 'application/json', extension: 'JSON' },
    xml: { mime: 'application/xml', extension: 'XML' },
    php: { mime: 'application/x-httpd-php', extension: 'PHP' },
    py: { mime: 'text/x-python', extension: 'PY' },
    java: { mime: 'text/x-java-source', extension: 'JAVA' },
    cpp: { mime: 'text/x-c++src', extension: 'CPP' },
    c: { mime: 'text/x-csrc', extension: 'C' },
    cs: { mime: 'text/x-csharp', extension: 'CS' },
    rb: { mime: 'text/x-ruby', extension: 'RB' },
    go: { mime: 'text/x-go', extension: 'GO' },
    rs: { mime: 'text/x-rust', extension: 'RS' },
    swift: { mime: 'text/x-swift', extension: 'SWIFT' },
    kt: { mime: 'text/x-kotlin', extension: 'KT' },
  },
} as const;

export const commonTypes = {
  images: Object.values(fileTypes.images),
  videos: Object.values(fileTypes.videos),
  audios: Object.values(fileTypes.audios),
  documents: Object.values(fileTypes.documents),
  archives: Object.values(fileTypes.archives),
  code: Object.values(fileTypes.code),
  all: Object.values(fileTypes).flatMap((category) => Object.values(category)),
} as const;
