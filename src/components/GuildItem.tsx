import { CDNRoutes, ImageFormat } from "@spacebarchat/spacebar-api-types/v9";
import styled from "styled-components";
import { useAppStore } from "../stores/AppStore";
import REST from "../utils/REST";
import Container from "./Container";
import Tooltip from "./Tooltip";

const Wrapper = styled(Container)`
	margin-top: 9px;
	padding: 0;
	width: 48px;
	height: 48px;
	border-radius: 50%;
	background-color: var(--background-secondary);
	display: flex;
	align-items: center;
	justify-content: center;
	transition: border-radius 0.2s ease, background-color 0.2s ease;

	&:hover {
		border-radius: 30%;
		background-color: var(--primary);
	}
`;

interface Props {
	guildId: string;
}

/**
 * List item for use in the guild sidebar
 */
function GuildItem(props: Props) {
	const app = useAppStore();
	const guild = app.guilds.get(props.guildId);

	if (!guild) return null;

	return (
		<Tooltip title={guild.name} placement="right">
			<Wrapper>
				{guild.icon ? (
					<img
						src={REST.makeCDNUrl(
							CDNRoutes.guildIcon(
								props.guildId,
								guild?.icon,
								ImageFormat.PNG,
							),
						)}
						width={48}
						height={48}
					/>
				) : (
					<span style={{ fontSize: "18px", fontWeight: "bold" }}>
						{guild?.acronym}
					</span>
				)}
			</Wrapper>
		</Tooltip>
	);
}

export default GuildItem;
