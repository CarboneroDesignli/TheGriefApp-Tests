export let currentSection: 'memory' | 'good' | undefined;

export function setSection(section: 'memory' | 'good') {
    currentSection = section;
}
