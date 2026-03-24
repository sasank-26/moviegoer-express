/**
 * ajaxHelper.ts
 *
 * Module 3 – AJAX, Reading XML and JSON
 * Utility functions for making AJAX requests and parsing JSON / XML responses.
 */

// ── JSON Utilities ─────────────────────────────────────────────────────────

/**
 * Fetch JSON data from a URL using the Fetch API (AJAX-style).
 * Returns the parsed JSON object or throws on HTTP error.
 */
export async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers ?? {}) },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Safely parse a JSON string. Returns the parsed value or null on error.
 */
export function safeParseJSON<T>(jsonString: string): T | null {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    console.error('Invalid JSON string:', jsonString);
    return null;
  }
}

/**
 * Serialize a value to a pretty-printed JSON string.
 */
export const toJSON = (data: unknown, indent = 2): string =>
  JSON.stringify(data, null, indent);

// ── XML Utilities ──────────────────────────────────────────────────────────

/**
 * Parse an XML string into a DOM Document.
 * Works in browser environments (uses DOMParser).
 */
export function parseXML(xmlString: string): Document {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'application/xml');
  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    throw new Error(`XML parse error: ${parseError.textContent}`);
  }
  return doc;
}

/**
 * Convert a simple flat object to an XML string.
 * Example: { title: "Inception", rating: "8.8" } →
 *   <movie><title>Inception</title><rating>8.8</rating></movie>
 */
export function objectToXML(obj: Record<string, unknown>, rootTag = 'item'): string {
  const inner = Object.entries(obj)
    .map(([key, value]) => `  <${key}>${String(value)}</${key}>`)
    .join('\n');
  return `<${rootTag}>\n${inner}\n</${rootTag}>`;
}

/**
 * Read all text values of a given tag name from a parsed XML Document.
 * Example: getXMLValues(doc, 'title') → ["Inception", "Interstellar"]
 */
export function getXMLValues(doc: Document, tagName: string): string[] {
  return Array.from(doc.getElementsByTagName(tagName)).map(
    (el) => el.textContent ?? ''
  );
}

// ── CRUD Request Helpers ───────────────────────────────────────────────────

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api';

/**
 * Generic GET request.
 */
export const apiGet = <T>(path: string) =>
  fetchJSON<T>(`${API_BASE}${path}`);

/**
 * Generic POST request with JSON body.
 */
export const apiPost = <T>(path: string, body: unknown) =>
  fetchJSON<T>(`${API_BASE}${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

/**
 * Generic PUT request with JSON body.
 */
export const apiPut = <T>(path: string, body: unknown) =>
  fetchJSON<T>(`${API_BASE}${path}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

/**
 * Generic DELETE request.
 */
export const apiDelete = <T>(path: string) =>
  fetchJSON<T>(`${API_BASE}${path}`, { method: 'DELETE' });
