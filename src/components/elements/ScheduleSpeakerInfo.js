import Image from 'next/image';

/**
 * ScheduleSpeakerInfo component displays a speaker's image, name, and title.
 * It is used within the schedule view to show who is presenting a session.
 * @param {object} props - The component props.
 * @param {string} props.name - The name of the speaker.
 * @param {string} props.title - The title or role of the speaker.
 * @param {string} props.image - The URL of the speaker's profile image.
 */
const ScheduleSpeakerInfo = ({ name, title, image }) => (
  <div className="flex items-center gap-3 mt-3 rounded-md">
    <Image
      className="h-9 w-9 rounded-full  object-cover"
      src={image}
      alt={name}
      width={8}
      height={8}
    />
    <div>
      <p className="text-sm text-gray-800">{name}</p>
      <p className="text-xs text-gray-500">{title}</p>
    </div>
  </div>
);
export default ScheduleSpeakerInfo;
