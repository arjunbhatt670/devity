import { NavigationTabs } from '@/components/NavigationTabs';
import { BaseTemplate } from '@/templates/BaseTemplate';

export default function DemoLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <BaseTemplate
      leftNav={<NavigationTabs />}
    >
      <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
    </BaseTemplate>

  );
}
