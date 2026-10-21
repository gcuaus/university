'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { translations } from '../translations';

type Language = 'en-US' | 'id';
type TranslationRecord = { original: string; translated: string };

const textRecords = new WeakMap<Text, TranslationRecord>();
const attributeRecords = new WeakMap<Element, Map<string, TranslationRecord>>();
const translatedAttributes = ['alt', 'aria-label', 'content', 'placeholder', 'title'];

function normalize(value: string) {
  return value.trim().replace(/\s+/g, ' ');
}

function translateText(node: Text, language: Language) {
  const current = node.nodeValue ?? '';
  const previous = textRecords.get(node);
  const original = previous && current === previous.translated ? previous.original : current;
  const match = original.match(/^(\s*)([\s\S]*?)(\s*)$/);
  if (!match || !match[2]) return;
  const translated = language === 'id' ? translations[normalize(match[2])] ?? match[2] : match[2];
  const next = `${match[1]}${translated}${match[3]}`;
  textRecords.set(node, { original, translated: next });
  if (current !== next) node.nodeValue = next;
}

function translateAttribute(element: Element, name: string, language: Language) {
  const current = element.getAttribute(name);
  if (current === null) return;
  let records = attributeRecords.get(element);
  if (!records) {
    records = new Map();
    attributeRecords.set(element, records);
  }
  const previous = records.get(name);
  const original = previous && current === previous.translated ? previous.original : current;
  const translated = language === 'id' ? translations[normalize(original)] ?? original : original;
  records.set(name, { original, translated });
  if (current !== translated) element.setAttribute(name, translated);
}

function translateElement(element: Element, language: Language) {
  if (element.matches('script, style, noscript')) return;
  for (const descendant of [element, ...element.querySelectorAll('*')]) {
    if (descendant.matches('script, style, noscript')) continue;
    for (const attribute of translatedAttributes) translateAttribute(descendant, attribute, language);
  }

  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.parentElement?.closest('script, style, noscript')
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT;
    },
  });
  let node: Node | null;
  while ((node = walker.nextNode())) translateText(node as Text, language);
}

function applyLanguage(language: Language) {
  document.documentElement.lang = language;
  translateElement(document.head, language);
  translateElement(document.body, language);
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en-US');

  useEffect(() => {
    if (window.localStorage.getItem('gctsa-language') === 'id') setLanguage('id');

    function handleLanguageChange(event: Event) {
      const nextLanguage = (event as CustomEvent<Language>).detail;
      if (nextLanguage === 'en-US' || nextLanguage === 'id') setLanguage(nextLanguage);
    }

    window.addEventListener('gctsa-language-change', handleLanguageChange);
    return () => window.removeEventListener('gctsa-language-change', handleLanguageChange);
  }, []);

  useEffect(() => {
    applyLanguage(language);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'characterData' && mutation.target instanceof Text) {
          translateText(mutation.target, language);
        }
        if (mutation.type === 'attributes' && mutation.target instanceof Element && mutation.attributeName) {
          translateAttribute(mutation.target, mutation.attributeName, language);
        }
        for (const addedNode of mutation.addedNodes) {
          if (addedNode instanceof Element) translateElement(addedNode, language);
          if (addedNode instanceof Text) translateText(addedNode, language);
        }
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: translatedAttributes,
      characterData: true,
      childList: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, [language]);

  return children;
}