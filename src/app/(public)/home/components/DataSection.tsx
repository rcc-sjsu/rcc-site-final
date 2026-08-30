import styles from '../data-section.module.css';

const stats = [
  { value: '364', label: 'total members' },
  { value: '66', label: 'active members' },
  { value: '18%', label: 'non-tech majors' },
];

export default function DataSection() {
  return (
    <section className={styles.container} aria-label="Club statistics">
      <div className={styles.stats}>
        {stats.map((stat) => (
          <div className={styles.stat} key={stat.label}>
            <span className={styles.number}>{stat.value}</span>
            <p className={styles.label}>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
