import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react'
import _ from 'lodash'
import { SocialIconData } from '../../data/footer/socialIcon'
import { useSWR } from '../../hooks/use-swr'
import { SocialIcon } from './SocialIcon'

export function SocialIconSection() {
    const { data, isLoading } = useSWR(`/contact/us/page/social/link/show`)

    const serializedData = new SocialIconData(_.head(data?.data?.results))

    console.log(serializedData)

    return (
        <div className="flex h-full items-center justify-between gap-x-4 rounded-2xl bg-base-0 p-4 shadow-[7px_20px_50px_rgba(0,0,0,0.09)] xmd:gap-x-5 xmd:p-8">
            <SocialIcon url={serializedData.facebookLink} icon={<IconBrandFacebook size={30} />} />
            <SocialIcon url={serializedData.instagramLink} icon={<IconBrandInstagram size={30} />} />
            <SocialIcon url={serializedData.twitterLink} icon={<IconBrandTwitter size={30} />} />
            <SocialIcon url={serializedData.youtubeLink} icon={<IconBrandYoutube size={30} />} />
        </div>
    )
}
