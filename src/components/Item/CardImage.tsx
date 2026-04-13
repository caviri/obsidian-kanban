import { TFile, getLinkpath } from 'obsidian';
import { memo, useContext, useEffect, useState } from 'preact/compat';
import { KanbanContext } from '../context';
import { c } from '../helpers';
import { Item } from '../types';

const imageExtensions = new Set(['png', 'jpg', 'jpeg', 'gif', 'bmp', 'svg', 'webp', 'avif']);

function getFirstImageFromContent(app: any, file: TFile): string | null {
  const cache = app.metadataCache.getFileCache(file);
  if (!cache) return null;

  if (cache.frontmatter) {
    const candidates = ['image', 'cover', 'banner', 'thumbnail'];
    for (const key of candidates) {
      const val = cache.frontmatter[key];
      if (typeof val === 'string' && val.trim()) {
        const trimmed = val.trim();
        if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
          return trimmed;
        }
        const resolved = app.metadataCache.getFirstLinkpathDest(
          getLinkpath(trimmed.replace(/^\[\[|\]\]$/g, '')),
          file.path
        );
        if (resolved) {
          return app.vault.getResourcePath(resolved);
        }
      }
    }
  }

  if (cache.embeds) {
    for (const embed of cache.embeds) {
      const linkPath = getLinkpath(embed.link);
      const ext = linkPath.split('.').pop()?.toLowerCase() || '';
      if (imageExtensions.has(ext)) {
        const resolved = app.metadataCache.getFirstLinkpathDest(linkPath, file.path);
        if (resolved) {
          return app.vault.getResourcePath(resolved);
        }
      }
    }
  }

  return null;
}

interface CardImageProps {
  item: Item;
}

export const CardImage = memo(function CardImage({ item }: CardImageProps) {
  const { stateManager } = useContext(KanbanContext);
  const showCardImage = stateManager.useSetting('show-card-image');
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const linkedFile = item.data.metadata.file;

  useEffect(() => {
    if (!showCardImage || !linkedFile) {
      setImageSrc(null);
      return;
    }
    const src = getFirstImageFromContent(stateManager.app, linkedFile);
    setImageSrc(src);
  }, [showCardImage, linkedFile]);

  if (!imageSrc) return null;

  return (
    <div className={c('item-card-image')}>
      <img src={imageSrc} alt="" loading="lazy" />
    </div>
  );
});
