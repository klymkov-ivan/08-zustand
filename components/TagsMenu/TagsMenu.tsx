'use client';

import { useState } from 'react';
import css from './TagsMenu.module.css';
import Link from 'next/link';

const tags = ['All', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => {
            return (
              <li key={tag} className={css.menuItem}>
                <Link
                  href={`/notes/filter/${tag}`}
                  onClick={toggle}
                  className={css.menuLink}
                >
                  {tag === 'All' ? 'All notes' : tag}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
